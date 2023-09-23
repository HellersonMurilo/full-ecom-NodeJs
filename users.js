// trabalhar com o fileSystem
const fs = require('fs')
//gerando a crifra pro id
const crypto = require('crypto')

class UserRepositories {

    constructor(filename) {
        if (!filename) {
            throw new Error("Você precisa informar um nome de arquivo !!!")
        }
        //propriedade da classe
        this.filename = filename;

        try {
            console.log('arquivo existe')
            fs.accessSync(this.filename) // ler o arquivo
        } catch (error) {
            console.log('criando arquivo...')
            fs.writeFileSync(this.filename, '[]')// criar o arquivo
        }
    }
    //criar os métodos
    async getAll() {
        //abrir o arquivo (this.filename)
        const contents = await fs.promises.readFile(this.filename)

        //fazer um parse para JSON
        const data = JSON.parse(contents)

        //ler o conteúdo
        //retornar a lista
        return data
    }

    async getOne(id) {
        //lista de todos os usuarios    
        const records = await this.getAll()
        const searchUser = records.find((records) => records.id === id)
        console.log(searchUser)
    }

    async delete(id) {
        const records = await this.getAll();
        const updateList = records.filter((records)=> records.id !== id) // filtro e removo ele da lista 
        await this.writeAll(updateList)
        
    }

    async update(id, atributos){
        //pegar todos
        const records = await this.getAll();

        console.log("antes")
        console.log(records)
        //buscar o elemento pelo o id
        const toUpdate = records.find((records) => records.id === id)

        //faz o update do objeto
        Object.assign(toUpdate, atributos)
        await this.writeAll(records)

        console.log("depois")
        console.log(records)
        
    }

    async create(atributos) {
        //adicionar o ID ao atributo recebido
        atributos.id = this.randomId()

        //ler o meu arquivo
        const records = await this.getAll()

        //gravar no array records
        records.push(atributos)

        //devolver para o arquivo
        await this.writeAll(records)
    }

    //função para devolver o arquivo
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records))
    }

    randomId() { //gera uma ID aleatoria
        return crypto.randomBytes(4).toString('hex')
    }

}

//teste dev

//new UserRepositories("users-senai.json")
const test = async () => {
    const repo = new UserRepositories("users.json")

    //Adicionar e criar user
   /*  repo.create({
        nome: "Giovanna",
        email: "giovanna@gmail.com"
    }) 
    const users = await repo.getAll(); */



    /*     //procurar pelo o id
        repo.getOne("06c1098b") */

    //deletar pelo o id
    repo.update("4d85ba80", {email: "hellerson.murilo@souza.com", nome: 'Murilo Calabianqui' })

}

test()