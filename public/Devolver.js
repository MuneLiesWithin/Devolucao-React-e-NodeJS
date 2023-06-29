function formatDate(data){
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
}

class Devolver extends React.Component {
    constructor(props) {
        super(props);
        const list = [];
        this.state = { 
            id: 0, 
            livro: '', 
            hora: new Date().getHours() + ':' + new Date().getMinutes(), 
            data: new Date(), 
            list: list 
        };

        this.handleLivroChange = this.handleLivroChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackend = this.handleBackend.bind(this);
    }

    handleBackend(event) {
        event.preventDefault();
        fetch('http://localhost:3000/backend', {
            method: 'POST', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                list: this.state.list
            }),
        }).then((response) => response.text())
            .then((responseText) => {
                alert(responseText);
            });
    }

    handleLivroChange(event) {
        this.setState({ livro: event.target.value });
    }

    handleSubmit(event) {
        const list = this.state.list;
        if (this.state.livro == ""){
            alert("Por favor insira o livro a ser devolvido!");
        }
        else {
        list.push({
            id: this.state.list.length + 1,
            livro: this.state.livro,
            hora: this.state.hora,
            data: formatDate(this.state.data)
        });
        }
        this.setState(state => ({
            livro: '',
            hora: new Date().getHours() + ':' + new Date().getMinutes(),
            data: new Date(),
            list: list
        }))
        event.preventDefault();
    }

    render() {
        var eventWindow = [];
            eventWindow = this.state.list.map((it) =>
                <li key={it.id}>
                 {it.livro} foi devolvido às {it.hora} de {it.data}.
                </li>
            );
            
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset id="left">
                Livro:<br />
                <input value={this.state.livro} onChange={this.handleLivroChange} />
                <br />
                <br />
                <button type="submit">Registrar devolução</button>
                <button onClick={this.handleBackend}>Mandar pro Backend</button>
                </fieldset>
                <br />
                <br />
                <fieldset id="right">
                <b>Janela de Eventos</b>
                <ul>
                {eventWindow}
                </ul>
                </fieldset>
            </form>
        );
    }
}
