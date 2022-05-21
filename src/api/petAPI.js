import axiosClient from "./axiosClient";

const PetApi = {
    getPetSold() {
        return axiosClient.get("pet/findByStatus?status=sold");
    },
    getPetPending() {
        return axiosClient.get("pet/findByStatus?status=pending");
    },
    getPetAvailable() {
        return axiosClient.get("pet/findByStatus?status=available");
    },
    getPetByID(params) {
        return axiosClient.get(`pet/${params}`);
    },
    addPet(pet) {
        return axiosClient.post("pet", pet);
    },
    deletePet(petId) {
        return axiosClient.delete(`pet/${petId}`);
    },
    orderPet(params) {
        return axiosClient.post("store/order", params);
    },
    updatePet(params) {
        return axiosClient.put("pet", params);
    },
}
export default PetApi;
