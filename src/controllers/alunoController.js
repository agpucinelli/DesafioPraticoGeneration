const alunoService = require('../services/alunoService');

module.exports = {
    
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let alunos = await alunoService.buscarTodos();

        for(let i in alunos){
            json.result.push({
                id: alunos[i].ID,
                aluno: alunos[i].NOME,
                idade: alunos[i].IDADE,
                nota1: alunos[i].NOTA1,
                nota2: alunos[i].NOTA2,
                professor: alunos[i].PROFESSOR,
                sala: alunos[i].NSALA
            });
        }

        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let id = req.params.id; //para pegar o parametro
        let aluno = await alunoService.buscarUm(id);

        if(aluno){
            json.result = aluno; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let NOME = req.body.NOME;
        let IDADE = req.body.IDADE;
        let NOTA1 = req.body.NOTA1;
        let NOTA2= req.body.NOTA2;
        let PROFESSOR = req.body.PROFESSOR;
        let SALA = req.body.NSALA;

        if (NOME && IDADE && NOTA1 && NOTA2 && PROFESSOR && SALA){
            let alunoId = await alunoService.inserir(NOME, IDADE, NOTA1, NOTA2, PROFESSOR, SALA);
            json.result = {
                id: alunoId,
                NOME,
                IDADE,
                NOTA1,
                NOTA2,
                PROFESSOR,
                SALA
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let ID = req.params;
        let { NOTA1, NOTA2 } = req.body;
    try {
        if (ID && NOTA1 && NOTA2){
            await alunoService.alterar(ID, NOTA1, NOTA2);
            json.result = {
                ID,                
                NOTA1,
                NOTA2,
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    } catch (error) {
        
        console.log(error)
    }
    },
    excluir: async(req, res) => {
        let json = {error:'', result:{}};
        let ID = req.params.id;
        console.log(ID)
        try {
        const results = await alunoService.excluir(ID);

        if (results.affectedRows > 0) {
            json.result = 'Aluno excluído com sucesso.';
        } else {
            json.error = 'Aluno não encontrado ou não pôde ser excluído.';
        }
    } catch (error) {
        json.error = 'Ocorreu um erro ao processar a solicitação.';
        console.error(error);
    }
        
        res.json(json);
    },
}


