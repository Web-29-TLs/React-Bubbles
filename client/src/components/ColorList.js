import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        updateColors(res.data)
      })
      .catch(err => {
        console.log('error in the useEffect', err)
      })
  }, [editing, addColor, updateColors])

  const addColorHexHandler = e => {
    setAddColor({...addColor, code: {hex: e.target.value}})
  }

  const addingHandler = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', addColor)
      .then(res => {
        // console.log(res)
        updateColors(res.data)
        // setAddColor(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const body = {...colorToEdit}
    const {id} = colorToEdit
    axiosWithAuth()
      .put(`/colors/${id}`, body)
      //didn't know this, but you don't always need a .then... who knew
      .catch(err => {
        console.log('err from saveEdit', err)
      })
      colorUpdate();
      setEditing(false);
  };

  function colorUpdate() {
    // setTimeout(() => {
      axiosWithAuth()
        .get('/colors')
        .then(res => 
          // console.log('res from colorUpdate', res)
          updateColors(res.data)
        )
        .catch(err => {
          console.log('err in colorUpdate', err)
        })
    // }, 100)
  }

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      // .then(res => {
      //   console.log('res from delete', res)
      // })
      .catch(err => {
        console.log('err from delete', err)
      })
      colorUpdate();
  };

  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>

          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

{/* adding a color */}
      <div className = 'add-color'>
        <form onSubmit={addingHandler}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={addColorHexHandler}
              value={addColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
          </div>
        </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      
              
      </div>
      </div>
    
  );
};

export default ColorList;
