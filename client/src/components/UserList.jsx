import React, { useState, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import UserItem from './UserItem'
import CreateForm from './CreateForm'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
import AddIcon from '@material-ui/icons/Add'

const GET_USERS = gql`
  query Users($skip: Int, $limit: Int) {
    users(skip: $skip, limit: $limit) {
      id
      name
      email
    }
  }
`

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2, 0),
    },
    createButton: {
      float: 'right',
      marginBottom: theme.spacing(2),
    },
  })
)

const initialVariables = { skip: 0, limit: 10 }

const UserList = () => {
  const [modal, setModal] = useState({ status: false, action: '', id: '' })
  const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
    variables: initialVariables,
    fetchPolicy: 'cache-and-network',
  })
  const classes = useStyles()

  if (loading) return <CircularProgress />
  if (error) return <p>Error :(</p>

  const handleClickMore = () => {
    fetchMore({
      variables: { skip: data.users.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          users: [...prev.users, ...fetchMoreResult.users],
        })
      },
    })
  }

  const handleModal = (status, action) => (id) =>
    setModal({ status, action, id })
  const closeModal = handleModal(false, '')

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleModal(true, 'create')}
        className={classes.createButton}
      >
        Создать
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => (
              <UserItem
                key={user.id}
                {...user}
                onDelete={handleModal(true, 'delete')}
                onEdit={handleModal(true, 'edit')}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonContainer}>
        <Button onClick={handleClickMore}>Загрузить ещё</Button>
      </div>
      <Dialog open={modal.status} onClose={closeModal}>
        <div>
          {modal.action === 'delete' && (
            <DeleteForm onClose={closeModal} id={modal.id} />
          )}
          {modal.action === 'edit' && (
            <EditForm onClose={closeModal} id={modal.id} />
          )}
          {modal.action === 'create' && (
            <CreateForm
              onClose={closeModal}
              query={{
                query: GET_USERS,
                variables: initialVariables,
              }}
            />
          )}
        </div>
      </Dialog>
    </Fragment>
  )
}

export default UserList
