import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Mistakes from './Mistakes'

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`

const DeleteForm = ({ id, query, onClose }) => {
  const [deleteUser, { error }] = useMutation(DELETE_USER, {
    update: (cache, { data: { deleteUser } }) => {
      const { users } = cache.readQuery(query)
      cache.writeQuery({
        ...query,
        data: { users: users.filter((user) => user.id !== deleteUser.id) },
      })
      handleClose()
    },
  })

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleConfirmForm = async () => {
    deleteUser({
      variables: { id },
    })
  }

  return (
    <Fragment>
      <DialogTitle>Удаление пользователя</DialogTitle>
      <DialogContent>
        <Mistakes error={error} />
        <DialogContentText>
          Вы действительно хотите удалить пользователя с идентификатором ${id}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleConfirmForm} color="primary">
          Удалить
        </Button>
      </DialogActions>
    </Fragment>
  )
}

DeleteForm.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func,
  query: PropTypes.shape({
    query: PropTypes.any,
    variables: PropTypes.object,
  }),
}

export default DeleteForm
