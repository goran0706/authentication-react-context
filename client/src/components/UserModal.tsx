import { EditIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IUser } from '../entities/user'

interface IUserModal {
  user: IUser
  onSave: (user: IUser) => void
}

const UserModal = ({ user, onSave }: IUserModal) => {
  const [state, setState] = useState(user)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSave = () => {
    onSave(state)
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label="Update User"
        icon={<EditIcon />}
        onClick={onOpen}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl mt={4} isRequired={true}>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={initialRef}
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4} isRequired={true}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={state.password || ''}
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4} isRequired={true}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={state.confirmPassword || ''}
                  onChange={(e) =>
                    setState({ ...state, confirmPassword: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={state.firstName}
                  onChange={(e) =>
                    setState({ ...state, firstName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={state.lastName}
                  onChange={(e) =>
                    setState({ ...state, lastName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={state.fullName}
                  onChange={(e) =>
                    setState({ ...state, fullName: e.target.value })
                  }
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            {state.password !== state.confirmPassword && (
              <Alert status="error">
                <AlertIcon />
                Password must match
              </Alert>
            )}
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserModal
