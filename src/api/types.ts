type ApiHandler<Params, ResponseBody> = (params: Params) => Promise<ResponseBody>;

export type HandlerBuilder<Dependencies, Params, ResponseBody> = (dependencies: Dependencies) => ApiHandler<Params, ResponseBody>