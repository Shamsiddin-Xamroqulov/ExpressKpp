import Joi from "joi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

let firstname = Joi.string().min(3).max(100).required().messages({
    "string.base": "Firstname must be a text string",
    "string.empty": "Firstname cannot be empty",
    "string.min": "Firstname must be at least 3 characters long",
    "string.max": "Firstname must not exceed 100 characters",
    "any.required": "Firstname is required"
});

let lastname = Joi.string().min(3).max(100).required().messages({
    "string.base": "Lastname must be a text string",
    "string.empty": "Lastname cannot be empty",
    "string.min": "Lastname must be at least 3 characters long",
    "string.max": "Lastname must not exceed 100 characters",
    "any.required": "Lastname is required"
});

let email = Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Email must be a valid email address",
    "string.base": "Email must be a text string",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required"
});

let phone = Joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": "Phone must contain only numbers and be 7 to 15 digits long",
    "string.base": "Phone must be a text string",
    "string.empty": "Phone cannot be empty",
    "any.required": "Phone is required"
});

export const EmployeValidatorSchema = Joi.object({
    firstname,
    lastname,
    email,
    phone,
});

export const createEmployeValidatorSchema = (data) => {
    let obj = {};
    if ("firstname" in data) obj.firstname = firstname;
    if ("lastname" in data) obj.lastname = lastname;    if ("email" in data) obj.email = email;
    if ("phone" in data) obj.phone = phone;
    return Joi.object(obj);
};

export const adminValidatorSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required().messages({
        "string.pattern.base": "Email must be a valid email address",
        "string.base": "Email must be a text string",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(3).max(100).required().messages({
        "string.pattern.base": "Password must be a valid email address",
        "string.base": "Password must be a text string",
        "string.min": "Lastname must be at least 3 characters long",
        "string.max": "Lastname must not exceed 100 characters",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required"
    }), 
});

export const userIdValid = Joi.object({
    userId: Joi.number().min(0).max(9999).required().messages({
        "number.base": "User id must be a number",
        "number.max": "User id must not exceed 1000 characters",
        "number.empty": "User id cannot be empty",
        "any.required": "User id is required"
    })
});

export const controlValidator = Joi.object({
    direction: Joi.string().required().messages({
        "string.base": "Direction must be a text string",
        "string.empty": "Direction cannot be empty",
        "any.required": "Direction is required"
    }),
    empId: Joi.number().required().messages({
        "number.base": "Employe id must be a number",
        "number.empty": "Employe id cannot be empty",
        "any.required": "Employe id is required"
    }),
    kppId: Joi.number().required().messages({
        "number.base": "Kpp id must be a number",
        "number.empty": "Kpp id cannot be empty",
        "any.required": "Kpp id is required"
    }),
});