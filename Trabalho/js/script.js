
function carregarTransacoes() {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    const tabela = document.querySelector('#tabela-transacoes tbody');
    tabela.innerHTML = '';
  
    transacoes.forEach((transacao, index) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${transacao.nome}</td>
        <td>${transacao.categoria}</td>
        <td>${transacao.data}</td>
        <td>R$ ${transacao.valor.toFixed(2)}</td>
        <td>
          <button onclick="editarTransacao(${index})">Editar</button>
          <button onclick="excluirTransacao(${index})">Excluir</button>
        </td>
      `;
      tabela.appendChild(linha);
    });
  
    atualizarResumo();
  }
  

  document.querySelector('#form-transacao').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const nome = document.querySelector('#nome').value;
    const categoria = document.querySelector('#categoria').value;
    const data = document.querySelector('#data').value;
    const valor = parseFloat(document.querySelector('#valor').value);
  
    const transacao = { nome, categoria, data, valor };


    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    transacoes.push(transacao);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
  

    document.querySelector('#form-transacao').reset();
    carregarTransacoes();
  });
  

  function excluirTransacao(index) {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    transacoes.splice(index, 1);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    carregarTransacoes();
  }
  

  function editarTransacao(index) {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    const transacao = transacoes[index];
    
    document.querySelector('#nome').value = transacao.nome;
    document.querySelector('#categoria').value = transacao.categoria;
    document.querySelector('#data').value = transacao.data;
    document.querySelector('#valor').value = transacao.valor;
  
    excluirTransacao(index);
  }
  

  function atualizarResumo() {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    let totalReceitas = 0;
    let totalDespesas = 0;
  
    transacoes.forEach(transacao => {
      if (transacao.categoria === 'receita') {
        totalReceitas += transacao.valor;
      } else {
        totalDespesas += transacao.valor;
      }
    });
  
    const saldoFinal = totalReceitas - totalDespesas;
  
    document.querySelector('#total-receitas').textContent = `R$ ${totalReceitas.toFixed(2)}`;
    document.querySelector('#total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
    document.querySelector('#saldo-final').textContent = `R$ ${saldoFinal.toFixed(2)}`;
  }
  

  document.querySelector('#theme-toggle').addEventListener('click', () => {
    const body = document.querySelector('body');
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      body.setAttribute('data-theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
    }
  });
  

  carregarTransacoes();