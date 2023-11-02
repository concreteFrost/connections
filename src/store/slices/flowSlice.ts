import { RFState } from "../types/rfState";
import { create } from "zustand";
import { Node, Edge } from "react-flow-renderer";
import { ISubstitutions } from "../interfaces/ISubstitutions";


export type FlowType = {

    blockData: [];
    created: Date;
    createdBy: string;
    flowIdentifier: string;
    flowName: string;
    flowVersion: string;
    flowConfig: string;
    isEnabled: string;
    lastAmended: Date;
    lastAmendedBy: string;
    serverIdentifier: string;
    startBlock: string;
    substitutions: Array<ISubstitutions>;
    visual: {
        blocks: Node<any>[];
        edges: Edge<any>[];
    };

}