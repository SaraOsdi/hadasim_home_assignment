import { MemberFields } from "./AddMember";

export const MIN_DATE_OF_BIRTH = '1900-01-01'

export function validateMember(memberFields: MemberFields) {
    console.log({ memberFields })

    if (memberFields.id_official.length !== 9) {
        return 'ID must contain 9 digits';
    }

    if (memberFields.cellphone.length !== 10) {
        return 'cellphone number must contain 10 digits and include only number'
    }

    if (memberFields.phone_number.length !== 10 && memberFields.phone_number.length !== 9) {
        return 'phone number must contain 9-10 digits and include only number'
    }
}