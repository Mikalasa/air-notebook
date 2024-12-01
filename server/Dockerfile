# 基础镜像：运行时环境（生产模式使用）
FROM mcr.microsoft.com/dotnet/aspnet:8.0.403 AS runtime
WORKDIR /app
EXPOSE 80

# 开发环境镜像：包含 SDK 和工具（开发模式使用）
FROM mcr.microsoft.com/dotnet/sdk:8.0.403 AS dev
WORKDIR /app
COPY . . 
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:80"]

# 构建生产模式的镜像
FROM mcr.microsoft.com/dotnet/sdk:8.0.403 AS build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# 使用运行时镜像运行生产环境的应用
FROM runtime AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "server.dll"]