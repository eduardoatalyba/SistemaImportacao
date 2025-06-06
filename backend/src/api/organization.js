const serviceOrganization = require("../service/organization")
const { sendUserCreatedEmail } = require("../service/emailService");

class ApiOrganization {

    async FindById(req, res) {
        try {
            const { id } = req.params
            const organization = await serviceOrganization.FindById(id)

            res.status(200).send({ organization })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async Create(req, res) {
        try {
            const { name, address, phone, email } = req.body;

            // Cria organização e usuário admin
            const result = await serviceOrganization.Create(name, address, phone, email);
            const organization = result.organization;
            const user = result.user;

            // Envia e-mail com os dados do usuário
            //await sendUserCreatedEmail({
              //  name: user.name,
               // email: user.email,
               // role: user.role,
               // organizationName: organization.name
           // });

            res.status(200).send({ organization, user });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: error.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { name, address, phone, email } = req.body;
            const organization = await serviceOrganization.Update(id, name, address, phone, email);

            res.status(200).send({ organization });
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    
    async Delete(req, res) {
        try {
            const { id } = req.params
            const organization = await serviceOrganization.Delete(id)

            res.status(200).send({ organization })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ApiOrganization()