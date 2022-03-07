import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { CharacterForm } from '../../components';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'name',
    headerName: 'Character Name',
    width: 250,
    editable: true,
  },
  {
    field: 'identity_name',
    headerName: 'Identity Name',
    width: 250,
    editable: true,
  },
  {
    field: 'image_url',
    headerName: 'Image URL',
    width: 150,
    editable: true,
  },
  {
    field: 'abilities',
    headerName: 'Abilites',
    // sortable: false,
    width: 500,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

interface gridData{
  data:{
    id?: string;
  }
}

export const DataTable = () => {
    let { characterData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () =>{
      setOpen(true);
    }

    let handleClose = () =>{
      setOpen(false);
    }

    let deleteData = async () => {
      for ( let id in gridData){
        await server_calls.delete(`${gridData[id]}`)}
      window.location.reload()
        
    }
    console.log(gridData)
    
    return (
      <div style={{ height: 400, width: '100%' }}>
          <h2>Characters In Inventory</h2>
        <DataGrid
          rows={characterData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
          {...characterData} 
        />
        <Button onClick={handleOpen}>Update Character</Button>
        <Button variant="contained" color="primary" onClick={deleteData}>Delete Character</Button>
        {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
          <DialogContent>
            <DialogContentText>Character id: {gridData[0]}</DialogContentText>
              <CharacterForm id={ `${gridData[0]}` }/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>
      </div>
    );
  }