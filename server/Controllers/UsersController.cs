using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Security.Cryptography;
using System.Text;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AirNotebookContext _context;

        public UsersController(AirNotebookContext context)
        {
            _context = context;
        }

        // 用户注册 API
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // 检查是否已存在用户名或邮箱
            if (await _context.Users.AnyAsync(u => u.Username == request.Username || u.Email == request.Email))
            {
                return BadRequest("用户名或邮箱已存在");
            }

            // 加密用户密码
            var passwordHash = HashPassword(request.Password);

            // 创建用户并存入数据库
            var user = new User
            {
                Username = request.Username,
                PasswordHash = passwordHash,
                Email = request.Email
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "用户注册成功" });
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
    }

    // 注册请求模型
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}