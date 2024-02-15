
export const GenerateUserName = (email) => {
    try {
        var nameMatch = email.match(/^([^@]*)@/);
        var name = nameMatch ? nameMatch[1] : makeid(5);

        return name;
    } catch (error) {
        throw new Error(error);
    }
}

export const calculateAge = (birthday) => {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}