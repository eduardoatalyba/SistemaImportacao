const generatePassword = require("../fns/generate-password");
const modelOrganization = require("../model/organization");
const serviceUser = require("./user");
const { sendUserCreatedEmail } = require("../service/emailService"); // Importando o serviço de e-mail

class ServiceOrganization {

    async FindById(id, transaction) {
        return modelOrganization.findByPk(id, { transaction });
    }

    async Create(name, address, phone, email, transaction) {
        if (!name) throw new Error('Favor informar o campo nome');
        if (!address) throw new Error('Favor informar o campo endereço');
        if (!phone) throw new Error('Favor informar o campo telefone');
        if (!email) throw new Error('Favor informar o campo email');
    
        const organization = await modelOrganization.create(
          { name, address, phone, email },
          { transaction }
        );
    
        const password = generatePassword();
        const user = await serviceUser.Create(
          organization.id,
          `Admin ${name}`,
          email,
          password,
          'admin',
          transaction
        );
    
        // Enviar e-mail de boas-vindas ao usuário criado
        const userInfo = {
            email: user.email,
            name: user.name,
            organizationName: organization.name,
            password: password
        };
        await sendUserCreatedEmail(userInfo); // Envia o e-mail
    
        return { organization, user: { ...user.dataValues, password } };
    }

    async Update(id, name, address, phone, email, transaction) {
        const organization = await this.FindById(id, transaction);
        if (!organization) {
            throw new Error("Organização não encontrada");
        }

        organization.name = name || organization.name;
        organization.address = address || organization.address;
        organization.phone = phone || organization.phone;
        organization.email = email || organization.email;

        return organization.save({ transaction });
    }

    async Delete(id, transaction) {
        const organization = await this.FindById(id, transaction);
    
        if (!organization) {
            throw new Error("Organização não encontrada");
        }

        organization.destroy({ transaction });
    }
}

module.exports = new ServiceOrganization();