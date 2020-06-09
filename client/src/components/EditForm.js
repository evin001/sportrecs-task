import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { GET_USERS } from './UserList'

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`

const EditForm = ({ id, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '' })
  const { data } = useQuery(GET_USER, {
    variables: { id },
  })
  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      handleClose()
    },
    _update: (cache, { data: { updateUser } }) => {
      console.log({ cache, data, updateUser })
      const { users } = cache.readQuery({ query: GET_USERS })
      cache.writeQuery({
        query: GET_USERS,
        data: { users },
      })
    },
  })

  useEffect(() => {
    if (data) {
      setForm({ name: data.user.name, email: data.user.email })
    }
  }, [data])

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleChangeForm = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const handleConfirmForm = async () => {
    updateUser({
      variables: { id, input: form },
    })
  }

  return (
    <Fragment>
      <DialogTitle>Редактирование пользователя</DialogTitle>
      <DialogContent>
        {error && (
          <DialogContentText>
            Не удалось обновить пользователя
          </DialogContentText>
        )}
        <TextField
          required
          value={form.name}
          label="Имя"
          margin="normal"
          fullWidth
          onChange={handleChangeForm('name')}
        />
        <TextField
          required
          value={form.email}
          label="Email"
          type="email"
          margin="normal"
          fullWidth
          onChange={handleChangeForm('email')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button
          onClick={handleConfirmForm}
          color="primary"
          disabled={!(form.name && form.email)}
        >
          Обновить
        </Button>
      </DialogActions>
    </Fragment>
  )
}

EditForm.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func,
}

export default EditForm
