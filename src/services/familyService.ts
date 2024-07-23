import { familyModel } from "../models"

export const createFamily = async (name: string) => {
  return await familyModel.createFamily(name)
}

export const updateFamily = async (familyId: string, updatedData: any) => {
  return await familyModel.updateFamily(familyId, updatedData)
}

export const findFamilyById = async (familyId: string) => {
  return await familyModel.findFamilyById(familyId)
}

export const findFamilyByMemberId = async (familyId: string) => {
  return await familyModel.findFamilyByMemberId(familyId)
}

export const addMemberToFamily = async (familyId: string, memberId: string) => {
  return await familyModel.addMemberToFamily(familyId, memberId)
}
