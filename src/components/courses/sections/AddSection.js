import axios from 'axios';
import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    // eslint-disable-next-line prettier/prettier
    ModalHeader
} from 'reactstrap';

export default function AddSection({ courseId, secNo }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [data, setData] = useState({ name: '' });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addSection = () => {
        const sectionData = {
            ...data,
            courseId,
            sec_no: secNo,
        };

        axios
            .post(
                'https://bohubrihi-backend-default-rtdb.firebaseio.com/sections.json',
                sectionData
            )
            .then((res) => {
                console.log(res);
                toggle();
            });
    };

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Add Section
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Section Name"
                                required
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addSection}>
                        Add Section
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
