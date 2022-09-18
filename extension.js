const hx = require("hbuilderx");
const fs = require("fs")
const path = require("path")
const stylelint = require("stylelint")

const EMBEDDED_FILE_SUPPORT = ['html', 'vue', 'nvue']
const CSS_FILE_SUPPORT = ['css', 'less', 'scss', 'sass']

let output = null;

function showOutput(msg) {
	if (!output) output = hx.window.createOutputChannel('stylelint-order');
	// output.clear();
	output.show();
	output.appendLine('[stylelint-order]:');
	output.append(msg);
}

function getEmbeddedBlock(args) {
	const {
		document
	} = args;
	let content = null;
	let pos = 0;
	let char = '';
	let startIndex = -1;
	let syntax = 'css';
	const text = document.getText();
	const textLangth = text.length;
	while (pos < textLangth) {
		char = text.charAt(pos);
		if (char === '<' && text.substr(pos, 6) === '<style') {
			let tag = '';
			do {
				char = text.charAt(pos);
				tag += char;
				pos++;
			} while (char !== '>' && pos < text.length);
			const matchedSyntax = tag.match(/lang=['"](.+)?['"]/);
			syntax = matchedSyntax ? matchedSyntax[1] : 'less';
			startIndex = pos + 2;
		}

		if (char === '<' && text.substr(pos, 8) === '</style>') {
			content = text.substring(startIndex, pos);
			const range = {
				start: startIndex,
				end: pos
			};

			return {
				range,
				content,
				syntax
			};
		}

		pos++;
	}
}

function getCssBlock(args) {
	const {
		document,
		selection,
		languageId
	} = args;
	let range = null;
	let content = null;

	if (!selection || (selection && selection.isEmpty())) {
		const end = document.getText().length
		range = {
			start: 0,
			end: end
		};
		content = document.getText();
	} else {
		range = {
			start: selection.start,
			end: selection.end
		};
		content = document.getText(selection);
	}

	return {
		range,
		content,
		syntax: languageId
	};
}

function getBlock(args) {
	const {
		languageId,
		document,
		selection
	} = args
	let block = null;
	if (~EMBEDDED_FILE_SUPPORT.indexOf(languageId)) {
		block = getEmbeddedBlock({
			document
		});
	} else if (~CSS_FILE_SUPPORT.indexOf(languageId)) {
		block = getCssBlock({
			document,
			selection,
			languageId
		});
	}
	return block
}

//该方法将在插件激活的时候调用
function activate(context) {
	const onCommand = hx.commands.registerTextEditorCommand('stylelint.formatter', function(textEditor) {
		const {
			document,
			selection
		} = textEditor;
		const {
			languageId
		} = document;
		const block = getBlock({
			languageId,
			document,
			selection
		});
		if (!block) return showOutput(`${ languageId } syntac not support now.`);
		const {
			range,
			content,
			syntax
		} = block;

		const _options = require("./.stylelintrc.js")
		if (process.env.EXTENSION_DATA_DIR &&
			fs.existsSync(process.env.EXTENSION_DATA_DIR + "/.stylelintrc.js")) {
			_options = require(process.env.EXTENSION_DATA_DIR + "/.stylelintrc.js");
		}
		stylelint.lint({
			code: content,
			config: _options,
			configBasedir: path.join(__dirname, "/"),
			fix: true
		}).then((res) => {
			textEditor.edit(builder => {
				builder.replace(range, res.output);
			})
			// 执行系统格式化
			hx.commands.executeCommand("editor.action.format")
		}).catch(err => showOutput(err.stack));
	});
	
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(onCommand)
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
