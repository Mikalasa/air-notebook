using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AirNotebookContext _context;
        private readonly PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();

        public UsersController(AirNotebookContext context)
        {
            _context = context;
        }

        // 用户注册 API
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // 验证请求体是否合法
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // 返回详细的验证错误信息
            }

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

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // 记录日志，返回服务器错误
                return StatusCode(500, $"注册用户时发生错误: {ex.Message}");
            }

            return Ok(new { Message = "用户注册成功" });
        }

        private string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password);
        }
    }

    // 注册请求模型
    public class RegisterRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}