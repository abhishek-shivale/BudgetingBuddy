class ApiResponse {
  constructor(
    public message: string,
    public status: number,
    public error: any,
    public success: boolean,
    public data: any,
  ) {}
}
export default ApiResponse;
