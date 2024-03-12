import { DataGrid } from '@mui/x-data-grid';
import {useBoundStore} from '../../utils/stores/boundStore';

export default function MPResultsDataGrid(id) {

  const { gameResults } = useBoundStore()
  
  const columns = [{
    field: 'placement',
    headerName: 'ranking',
    width: 100
  }, {
    field: 'name',
    headerName: 'user',
    width: 250
  }, {
    field: 'wpm',
    headerName: 'wpm',
    width: 250
  }, {
    field: 'accuracy',
    headerName: 'acc',
    width: 250
  }]

  return (
    <>
      <DataGrid 
        rows={gameResults}
        columns={columns}
      />
    </>
  )
}
