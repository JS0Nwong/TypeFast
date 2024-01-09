import React, { Component } from "react"
import { PropTypes } from 'prop-types'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import '../../App.css'
/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class Editor extends Component {
  constructor(props) {
      super(props)
      this.state = { 
          editorHtml: "", 
          theme: this.props.styles,
          
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
      this.props.editorHtmlChange(html)
      this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
      if (newTheme === "core") newTheme = null;
      this.setState({ theme: newTheme })
  }

  render() {
      return (
          <div>
              <ReactQuill
                  theme={this.state.theme}
                  onChange={this.handleChange}
                  value={this.state.editorHtml}
                  modules={Editor.modules}
                  formats={Editor.formats}
                  bounds={'.app'}
                  placeholder={this.props.placeholder}
              />
          </div>
      )
  }
}

/* 
* Quill modules to attach to editor
* See https://quilljs.com/docs/modules/ for complete options
*/
Editor.modules = {
  toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
  ],
  clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
  }
}
/* 
* Quill editor formats
* See https://quilljs.com/docs/formats/
*/
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
* PropType validation
*/
Editor.propTypes = {
  placeholder: PropTypes.string,
}

export default Editor   