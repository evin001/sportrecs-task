import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

const UserItem = ({ id, name, email, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (onDelete) onDelete(id)
  }

  const handleEdit = () => {
    if (onEdit) onEdit(id)
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          style={{ marginRight: '8px' }}
        >
          Редактировать
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Удалить
        </Button>
      </TableCell>
    </TableRow>
  )
}

UserItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

export default UserItem
