import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`

const CreateForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '' })
  const [createUser, { error }] = useMutation(CREATE_USER)

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleChangeForm = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const handleConfirmForm = async () => {
    createUser({
      variables: { input: form },
    })
  }

  return (
    <Fragment>
      <DialogTitle>Создание пользователя</DialogTitle>
      <DialogContent>
        {error && (
          <DialogContentText>Не удалось создать пользователя</DialogContentText>
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
          Создать
        </Button>
      </DialogActions>
    </Fragment>
  )
}

CreateForm.propTypes = {
  onClose: PropTypes.func,
}

export default CreateForm
