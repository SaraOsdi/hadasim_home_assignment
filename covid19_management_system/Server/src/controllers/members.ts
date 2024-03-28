// @ts-nocheck
import { Request, Response } from "express";
import { runQuery } from "../help_functions/connectionTypes";

export async function getMembersDetails(req: Request, res: Response) {
  try {
    const query: string = `
    SELECT * FROM members
    INNER JOIN members_data
    ON members_data.id_member = members.id;
    `;

    const results = await runQuery(query);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function addMember(req: Request, res: Response) {
  let memberInd = 0;
  let idResult;
  try {
    let {
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      date_of_birth,
      first_vaccination_date,
      second_vaccination_date,
      third_vaccination_date,
      forth_vaccination_date,
      vaccine_manufacturer,
      positive_test_date,
      recovery_date,
    } = req.body;

    !first_vaccination_date
      ? (first_vaccination_date = null)
      : first_vaccination_date;
    !second_vaccination_date
      ? (second_vaccination_date = null)
      : second_vaccination_date;
    !third_vaccination_date
      ? (third_vaccination_date = null)
      : third_vaccination_date;
    !forth_vaccination_date
      ? (forth_vaccination_date = null)
      : forth_vaccination_date;
    !positive_test_date ? (positive_test_date = null) : positive_test_date;
    !recovery_date ? (recovery_date = null) : recovery_date;

    if (
      (second_vaccination_date &&
        first_vaccination_date &&
        new Date(second_vaccination_date) < new Date(first_vaccination_date)) ||
      (third_vaccination_date &&
        second_vaccination_date &&
        new Date(third_vaccination_date) < new Date(second_vaccination_date)) ||
      (forth_vaccination_date &&
        third_vaccination_date &&
        new Date(forth_vaccination_date) < new Date(third_vaccination_date)) ||
      (recovery_date && !positive_test_date) ||
      (vaccine_manufacturer && !first_vaccination_date) ||
      (!vaccine_manufacturer && first_vaccination_date) ||
      (forth_vaccination_date &&
        (!third_vaccination_date ||
          !second_vaccination_date ||
          !first_vaccination_date)) ||
      (third_vaccination_date &&
        (!second_vaccination_date || !first_vaccination_date)) ||
      (second_vaccination_date && !first_vaccination_date)
    ) {
      return res.status(418).json({ message: "logic error" });
    }
    const insertMemberValues = [
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      date_of_birth,
    ];

    const membersQuery: string = `
    INSERT INTO members
    (
    id_official,
    name,
    phone_number,
    cellphone,
    address_city,
    address_street,
    address_house_num,
    date_of_birth)
    VALUES
    (?,?,?,?,?,?,?,?);
    `;

    await runQuery(membersQuery, insertMemberValues);
    memberInd++;

    idResult = await runQuery("SELECT LAST_INSERT_ID() AS inserted_id;");

    const membersDataQuery: string = `
    INSERT INTO members_data
    (id_member,
    first_vaccination_date,
    second_vaccination_date,
    third_vaccination_date,
    forth_vaccination_date,
    vaccine_manufactorer,
    positive_test_date,
    recovery_date)
    VALUES
    (?,?,?,?,?,?,?,?);
    `;

    const insertMemberDataValues = [
      idResult[0].inserted_id,
      first_vaccination_date,
      second_vaccination_date,
      third_vaccination_date,
      forth_vaccination_date,
      vaccine_manufacturer,
      positive_test_date,
      recovery_date,
    ];

    await runQuery(membersDataQuery, insertMemberDataValues);

    res.json({ message: "the member has been added!" });
  } catch (error) {
    if (memberInd === 1) {
      await runQuery(
        "DELETE FROM members where id = ?",
        idResult[0].inserted_id
      );
    }
    console.log(error);
    res.status(500).json({
      message: "error in adding the member. check the inputs and try again",
    });
  }
}

export async function updateMember(req: Request, res: Response) {
  try {
    let {
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      first_vaccination_date,
      second_vaccination_date,
      third_vaccination_date,
      forth_vaccination_date,
      vaccine_manufacturer,
      positive_test_date,
      recovery_date, date_of_birth
    } = req.body;

    !first_vaccination_date
      ? (first_vaccination_date = null)
      : first_vaccination_date;
    !second_vaccination_date
      ? (second_vaccination_date = null)
      : second_vaccination_date;
    !third_vaccination_date
      ? (third_vaccination_date = null)
      : third_vaccination_date;
    !forth_vaccination_date
      ? (forth_vaccination_date = null)
      : forth_vaccination_date;
    !positive_test_date ? (positive_test_date = null) : positive_test_date;
    !recovery_date ? (recovery_date = null) : recovery_date;

    const isSecondVaccieBeforeFirst = second_vaccination_date &&
      first_vaccination_date &&
      new Date(first_vaccination_date) !== new Date(0) &&
      new Date(second_vaccination_date) !== new Date(0) &&
      new Date(second_vaccination_date) < new Date(first_vaccination_date);
    if (isSecondVaccieBeforeFirst) {
      return res.status(418).json({ message: "2nd vaccine can't be before 1st vaccine" });
    }
    const isThirdVaccineBeforeSecond = third_vaccination_date &&
      second_vaccination_date &&
      new Date(third_vaccination_date) !== new Date(0) &&
      new Date(second_vaccination_date) !== new Date(0) &&
      new Date(third_vaccination_date) < new Date(second_vaccination_date);

    if (isThirdVaccineBeforeSecond) {
      return res.status(418).json({ message: "3rd vaccine can't be before 2nd vaccine" });
    }

    const isFourthBeforeThirdVaccine = forth_vaccination_date &&
      third_vaccination_date &&
      new Date(forth_vaccination_date) !== new Date(0) &&
      new Date(third_vaccination_date) !== new Date(0) &&
      new Date(forth_vaccination_date) < new Date(third_vaccination_date);

    if (isFourthBeforeThirdVaccine) {
      return res.status(418).json({ message: "4 vaccine can't be before 3 vaccine" });
    }

    if (first_vaccination_date && new Date(first_vaccination_date) < new Date(date_of_birth)) {
      return res.status(418).json({ message: "vaccination date can't be smaller than date of birth" });
    }

    if (first_vaccination_date && new Date(first_vaccination_date) < new Date(date_of_birth)) {
      return res.status(418).json({ message: "vaccination date can't be smaller than date of birth" });
    }

    if (positive_test_date && new Date(positive_test_date) < new Date(date_of_birth)) {
      return res.status(418).json({ message: "positive test date can't be smaller than date of birth" });
    }

    const hasVaccineWithoutVaccineManufacturer = !vaccine_manufacturer && first_vaccination_date;
    if (hasVaccineWithoutVaccineManufacturer) {
      return res.status(418).json({ message: "has Vaccine Without Vaccine Manufacturer" });
    }
    if (
      (recovery_date && !positive_test_date) ||
      (forth_vaccination_date &&
        (!third_vaccination_date ||
          !second_vaccination_date ||
          !first_vaccination_date)) ||
      (third_vaccination_date &&
        (!second_vaccination_date || !first_vaccination_date)) ||
      (second_vaccination_date && !first_vaccination_date)
    ) {
      return res.status(418).json({ message: "logic error" });
    }

    const query: string = `
    UPDATE members
    SET
    id_official = ?,
    name = ?,
    phone_number = ?,
    cellphone = ?,
    address_city = ?,
    address_street = ?,
    address_house_num = ?
    WHERE id_official = ?;
    `;

    const memberToUpdate = [
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      id_official,
    ];

    await runQuery(query, memberToUpdate);

    const membersDateQuery = `
    UPDATE members_data
    SET
    first_vaccination_date = ?,
    second_vaccination_date = ?,
    third_vaccination_date = ?,
    forth_vaccination_date = ?,
    vaccine_manufactorer = ?,
    positive_test_date = ?,
    recovery_date = ?
    WHERE id_member = (SELECT id from members where id_official = ?);
    `;

    const memberDataToUpdate = [
      first_vaccination_date ? new Date(first_vaccination_date) : null,
      second_vaccination_date ? new Date(second_vaccination_date) : null,
      third_vaccination_date ? new Date(third_vaccination_date) : null,
      forth_vaccination_date ? new Date(forth_vaccination_date) : null,
      vaccine_manufacturer,
      positive_test_date ? new Date(positive_test_date) : null,
      recovery_date ? new Date(recovery_date) : null,
      id_official,
    ];

    await runQuery(membersDateQuery, memberDataToUpdate);

    res.json({ message: "member updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function deleteMember(req: Request, res: Response) {
  try {
    const { memberId } = req.params;

    const query: string = `
    DELETE FROM members
    where id = ?
    `;

    await runQuery(query, [memberId]);

    res.json({ message: "member deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function addMemberImage(req: Request, res: Response) {
  console.log(req.file?.path)
  res.sendStatus(200)
}
