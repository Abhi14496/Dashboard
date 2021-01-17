import React from 'react';
import axios from 'axios'
import ReactTable from "react-table";
import regeneratorRuntime from "regenerator-runtime";
import '../../node_modules/react-table/src/react-table.scss';
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true
        }
    }
    async getUsersData() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(res.data)
        this.setState({ loading: false, users: res.data })
    }
    componentDidMount() {
        this.getUsersData()
    }
    render() {
        const columns = [{
            Header: 'ID',
            accessor: 'id',
        }
            , {
            Header: 'Name',
            accessor: 'name',
            Cell: (row) => {
                return <h4>{row.original.name}</h4>
            }
        }

            , {
            Header: 'Username',
            accessor: 'username',
        }
            , {
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Email',
            accessor: 'email',
            Cell: (row) => {
                return <a href={`mail.to:${row.original.email}`}>{row.original.name}</a>
            }
        },
        {
            Header: 'Website',
            accessor: 'website',
        }
        ]
        return (
            <ReactTable
                data={this.state.users}
                columns={columns}
            />

        )
    }
}

export { HomePage };