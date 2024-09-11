import { Modal, Button, Form } from "react-bootstrap";
import { UploadedPackage } from "../../packages/usePackages";

type ShareRepoModalProps = {
    show: boolean;
    onHide: () => void;
    onShare: (email: string) => void;
    nameToShare: string;
    setTargetName: (nameToShare: string) => void;
    selectedPackage: UploadedPackage | null;
}

export default function ShareRepoModal({
    show,
    onHide,
    onShare,
    nameToShare,
    setTargetName,
    selectedPackage,
}: ShareRepoModalProps) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Share Repository {selectedPackage?.package_name}1
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter target user name"
                            value={nameToShare}
                            onChange={(e) => setTargetName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => onShare(nameToShare)}>
                    Share
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
