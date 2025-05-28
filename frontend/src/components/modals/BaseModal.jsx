import { Modal } from "@mui/material"

const BaseModal = ({ handleClose, open, children}) => {
    return <Modal
        open={open}
        onClose={handleClose}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
      >
        <div className="p-8 bg-white rounded-md">
        {children}
        </div>
      </Modal>
}

export default BaseModal