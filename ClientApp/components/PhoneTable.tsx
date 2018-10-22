import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import { RowTable } from './RowTable';
import { EventHandler, FormEvent } from 'react';

interface PhoneFetchData {
    phones: Phone[];
    phone: Phone;
    loading: boolean;
    edit: boolean;
}

export class PhoneTable extends React.Component<RouteComponentProps<{}>, PhoneFetchData> {
    constructor() {
        super();
        this.state = {
            phones: [], loading: true, edit: false, phone: new Phone };

        fetch('http://localhost:14184/api/phone/getAll')
            .then(response => response.json() as Promise<Phone[]>)
            .then(data => {
                this.setState({ phones: data, loading: false });
            });

        this.deletePhone = this.deletePhone.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addPhone = this.addPhone.bind(this);
        this.editPhone = this.editPhone.bind(this);
        this.cansel = this.cansel.bind(this);
        this.handelChange = this.handelChange.bind(this);
    }

    public render() {
        let contents;
        if (!this.state.edit) {
            contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderPhoneTable(this.state.phones);
        }
        else {
            contents = this.addPhoneForm();
        }

        return <div>
            <section className='hero'>
                <h1 className='title'>Phones list</h1>
            </section>
            
            {contents}
        </div>;
    }

    private deletePhone(id?: number) {
        fetch('http://localhost:14184/api/phone/remove/' + id, { method: 'delete' });
        this.setState({
            phones: this.state.phones.filter(phone => { return phone.id !== id })
            });
    }

    private addPhone() {
        this.setState({ edit: true})
    }

    private editPhone(phone1: Phone) {
        this.setState({
            phone: phone1,
            edit: true
        })
    }

    handelChange(event: FormEvent<HTMLInputElement>) {
        if (event.currentTarget.name === 'name') {
            this.state.phone.name = event.currentTarget.value;
            this.setState({ phone: this.state.phone });
        }
    }

    private cansel() {
        this.setState({ edit: true, phone: new Phone })
    }

    private renderPhoneTable(phones: Phone[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Company</td>
                    <td>Price</td>
                    <td>Year</td>
                    <td>Mamory</td>
                    <td>Color</td>
                    <td>Camera</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {phones.map((phone, index) =>
                    // was deleted from props of tr teg
                    <tr key={index}>
                        <td>{phone.name}</td>
                        <td>{phone.company}</td>
                        <td>{phone.price}</td>
                        <td>{phone.yearRelease}</td>
                        <td>{phone.valueMemory}</td>
                        <td>{phone.colorPhone}</td>
                        <td>{phone.cameraPx}</td>
                        <td>
                            <button className='button is-info' onClick={() => { this.editPhone(phone) }}>Edit</button>
                            <button className='button is-danger' onClick={() => {this.deletePhone(phone.id)}}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
            <div>
                <button onClick={() => { this.addPhone() }}>add</button>
            </div>
        </table>;
    }

    private handleSave() {
        if (this.state.phone.id === undefined) {
            fetch('http://localhost:14184/api/phone/add', {
                method: 'post',
                //mode: 'cors',
                body: JSON.stringify(this.state.phone)
            }).then((response) => response.json());
        }
        else {
            let result;
            fetch('http://localhost:14184/api/phone/edit', {
                method: 'post',
                body: JSON.stringify(this.state.phone)
            }).then((response) => result = response.json());
        }
        /*
        fetch('http://localhost:14184/api/phone')
            .then(response => response.json() as Promise<Phone[]>)
            .then(data => {
                this.setState({ phones: data, edit: false });
            });
            */
    }

    private addPhoneForm() {
        return <form onSubmit={this.handleSave}>
            <input type='hidden' name='id' value={this.state.phone.id} />
            <div>
                <label>Name</label>
                <input type='text' name='name' defaultValue={this.state.phone.name} onChange={this.handelChange} />
            </div>
            <div>
                <label>Company</label>
                <input type='text' name='company' defaultValue={this.state.phone.company} />
            </div>
            <div>
                <label>Price</label>
                <input type='number' name='price' value={this.state.phone.price} />
            </div>
            <div>
                <label>Year</label>
                <input type='text' name='yearRelease' defaultValue={this.state.phone.yearRelease} />
            </div>
            <div>
                <label>Color</label>
                <input type='text' name='colorPhone' defaultValue={this.state.phone.colorPhone} />
            </div>
            <div>
                <label>Mamory</label>
                <input type='text' name='valueMemory' defaultValue={this.state.phone.valueMemory} />
            </div>
            <div>
                <label>Camera</label>
                <input type='text' name='cameraPx' defaultValue={this.state.phone.cameraPx} />
            </div>
            <div>
                <button onClick={() => { this.cansel() }}>cansel</button>
                <input type='submit' value='add' />
            </div>
        </form>
    }
}


export class Phone {
    
    id?: number;
    company?: string;
    name?: string;
    price?: number;
    yearRelease?: string;
    colorPhone?: string;
    valueMemory?: string;
    cameraPx?: string;
}