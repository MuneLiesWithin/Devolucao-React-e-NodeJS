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
          <img src="fundo.jpg" width="1000" height="200"/>
          {this.state.usuarioLogado ? 
          <>
          <h2><b>Olá, {this.state.nome}!</b></h2>
          <h3>Insira o livro para registrar uma devolução no sistema.</h3>  
          <Devolver />
          </> 
            
          :

          <form id='formulario' onSubmit={this.handleSubmit}>   
            <h2>Login para o sistema de devoluções da Biblioteca Alexandria</h2>
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
            <input type="submit" value="Login" />          
          </form>
          }
          <br /><br />
          <b>{this.state.footnote}</b>
        </div>
      );
    }
}

