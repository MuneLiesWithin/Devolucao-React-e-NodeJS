class LoginPage extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        nome: '',
        senha: '',
        usuarioLogado: false,
        footnote: ''
      };
    }

    componentDidMount() {
      fetch('http://localhost:3000/backend')
          .then((response) => response.json())
          .then((responseJson) => {
          this.setState({
              footnote: responseJson
          })
      });
    }

    handleChangeNome = (event) => {   	                
      this.setState({nome: event.target.value});
    }

    handleChangeSenha = (event) => {   	                
      this.setState({senha: event.target.value});
    }
    
    handleSubmit = (event) => {
      if (this.state.nome == "" || this.state.senha == ""){
        alert("Por favor insira o seu nome e a senha!");
      }
      else if(this.state.senha != "root"){
        alert("A senha correta é 'root'");
      }
      else {
        this.setState({usuarioLogado: true});
      }
      event.preventDefault();
    }
    
    render() {
      return (
        <div>
          {this.state.usuarioLogado ? 
          <>  
          <Devolver />
          </> 
            
          :

          <form id='formulario' onSubmit={this.handleSubmit}>   
            <h2>Sistema de Devoluções</h2>
            <label>
            Nome:<br />
            <input type="text" nome={this.state.nome} onChange={this.handleChangeNome} />
            </label>
            <br/>
            <br/>
            <label>
            Senha:<br />
            <input type="password" senha={this.state.senha} onChange={this.handleChangeSenha} />
            </label>
            <br/>
            <br/>
            <button type="submit">Login</button>          
          </form>
          }
          <footer>{this.state.footnote}</footer>
        </div>
      );
    }
}

