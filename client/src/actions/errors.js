export const ERROR_OCCURRED = 'ERROR_OCCURRED';

export const errorOccurred = (error) => ({
    type: ERROR_OCCURRED,
    error
});