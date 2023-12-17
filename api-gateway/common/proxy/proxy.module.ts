import { Module } from "@nestjs/common";
import { ClientProxyMoonei } from "./client-proxy";

@Module({
    providers: [ClientProxyMoonei],
    exports: [ClientProxyMoonei]
})
export class ProxyModule{}
