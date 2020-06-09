import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import validator from 'validator'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Mistakes from './Mistakes'

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
          disabled={!(form.name && validator.isEmail(form.email))}
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
