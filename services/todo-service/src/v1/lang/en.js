import config from '../../../config/default';
export default {
    email: {
        welcome: `Hi ,	We're very excited to have you on-board.
		With ${config.app.appName}, you can customize your dream home at an affordable price`,
        welcome_subject: `Welcome to ${config.app.appName}`
    },
    auth: {
        email_exist: 'Email already exist'
    },
    error: {
        server: 'Error in setup interaction',
        resource_not_found: 'Resource not found!',
        profile_not_found: 'Profile not found!',
        resource_already_exist: 'Duplicate record is not allowed',
        inputs: 'There are problems with your input',
        un_authorized: 'Not authorized',
        not_auth_token: 'No authorization token provided',
        not_found: 'Resource not found',
        no_update_input: 'Nothing to update',
        network: 'Please check your network connection'
    },
    todos: {
        created: 'Todo successfully created',
        updated: 'Todo successfully updated',
        deleted: 'Todo successfully deleted',
        not_found: 'Todo not found',
        cannot_delete_plan: 'Not authorized to delete a regular main',
        cannot_update_booking: 'Not authorized to perform this action',
        request_does_not_exist: 'Todo info does not exist',
    }
};
