const { Plugin } = require('@uppy/core')
const Translator = require('@uppy/utils/lib/Translator')
const { h } = require('preact')
const Lexmark = require('./Lexmark')

module.exports = class UppyLexmark extends Plugin {
  static VERSION = "0.1.2"

  
  constructor (uppy, opts) {
    super(uppy, opts)
    this.lexmark = new Lexmark();
    window._mfpUppy = uppy;
    this.id = this.opts.id || 'UppyLexmark'
    this.title = 'Lexmark'
    this.type = 'acquirer'

    this.defaultLocale = {
      strings: {
        scanFromMFP: 'Scan from MFP'
      }
    }

    // Default options
    const defaultOptions = {
      pretty: true,
      inputName: 'files[]'
    }

    // Merge default options with the ones set by user
    this.opts = { ...defaultOptions, ...opts }
    this.i18nInit()
    this.render = this.render.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }  

  setOptions (newOpts) {
    super.setOptions(newOpts)
    this.i18nInit()
  }

  i18nInit () {
    this.translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale])
    this.i18n = this.translator.translate.bind(this.translator)
    this.i18nArray = this.translator.translateArray.bind(this.translator)
    this.setPluginState() // so that UI re-renders and we see the updated locale
  }

  addFiles (files) {
    const descriptors = files.map((file) => ({
      source: this.id,
      name: file.name,
      type: file.type,
      data: file
    }))

    try {
      this.uppy.addFiles(descriptors)
    } catch (err) {
      this.uppy.log(err)
    }
  }

  handleClick (ev) {
    this.lexmark.sendMessageToESF("doScan");
  }

  render (state) {
    return ( 
      <div class="uppy-Root uppy-FileInput-container">
        {this.opts.pretty &&
          <button
            class="uppy-FileInput-btn"
            type="button"
            onclick={this.handleClick}
          >
            {this.i18n('scanFromMFP')}
          </button>}
      </div>
    )
  }

  install () {
    const target = this.opts.target
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall () {
    this.unmount()
  }
}
