# 基础镜像：运行时环境
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# 开发环境镜像：包含 SDK 和工具
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

# 复制项目文件到容器内并安装依赖
COPY ["server.csproj", "./"]
RUN dotnet restore "./server.csproj"

# 开发阶段运行时支持代码监控和热重载
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:80"]