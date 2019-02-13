import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class ModalBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section className="modal-section">
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} effect="fadeInRight" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
        );
    }
}
