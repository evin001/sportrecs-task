import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Mistakes from './Mistakes'

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`

const CreateForm = ({ onClose, query }) => {
  const [form, setForm] = useState({ name: '', email: '' })
  const [createUser, { error }] = useMutation(CREATE_USER, {
    update: (cache, { data: { createUser } }) => {
      const { users } = cache.readQuery(query)
      cache.writeQuery({
        ...query,
        data: { users: users.concat([createUser]) },
      })
      handleClose()
    },
  })

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
        <Mistakes error={error} />
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
  query: PropTypes.shape({
    query: PropTypes.any,
    variables: PropTypes.object,
  }),
}

export default CreateForm
