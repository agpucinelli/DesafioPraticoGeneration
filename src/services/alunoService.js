const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM alunos', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (ID) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM alunos WHERE ID = ?', [ID], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },
    inserir: (NOME, IDADE, NOTA1, NOTA2, PROFESSOR, NSALA)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO alunos(NOME, IDADE, NOTA1, NOTA2, PROFESSOR, NSALA) VALUES (?, ?, ?, ?, ?, ?)',
                [NOME, IDADE, NOTA1, NOTA2, PROFESSOR, NSALA],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertid); //insertId
                }
            );  
        });
    },
    alterar:(ID, NOTA1, NOTA2)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE alunos SET NOTA1 = ? WHERE ID = ?',
                [ID, NOTA1, NOTA2],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (ID)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM alunos WHERE id = ?',[ID], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};


