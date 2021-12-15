import { NodeBuilder } from "@baklavajs/core";

export function BlockBuilder({ InputsInfo, OutputsInfo }) {
    const Block = new NodeBuilder("DisplayNode");
    Block.setName("Block")
    InputsInfo.forEach((input) => {
        Block.addInputInterface(input.name, "NumberOption", 0);
    });
    OutputsInfo.forEach((output) => {
        Block.addOutputInterface(output.name);
    });
    return Block.build();
}