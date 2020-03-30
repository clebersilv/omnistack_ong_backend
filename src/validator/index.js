const { Segments, Joi, celebrate } = require('celebrate');

module.exports = {
    /**
     * Validação do cadastro de ONGs
     * Recupero os campos que informo no body
     * para efetuar a validação
    */
    postValidateONG() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required().min(10).max(14),
                city: Joi.string().required(),
                uf: Joi.string().required().length(2)
            }),
        });
    },

    /**
     * Validação do profile
     * Recupero o campo authorization do HEADER para validar
    */
    getValidateProfile() {
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required(),
            }).unknown(),
        });
    },

    /**
     * Validação do delete
     * Recupero o campo id do PARAMS para validar
    */
    deleteValidateIncident() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            }),
        });
    },

    /**
     * Validação do delete
     * Recupero o campo id do PARAMS para validar
    */
   getValidateIncidentPage() {
    return celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        }),
    });
},
};