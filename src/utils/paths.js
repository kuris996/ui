export function getInputsPath(uuid) {
    return `data/Inputs/${uuid}/Input_inputs/Excels/`
}

export function getOutputsPath(uuid) {
    return `data/Inputs/${uuid}/Input_outputs/`
}

export function getModelsPath(kit, uuid) {
    return `data/Inputs/${kit}/Model_outputs/${uuid}/`
}