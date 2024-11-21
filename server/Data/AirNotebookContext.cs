using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class AirNotebookContext : DbContext
    {
        public AirNotebookContext(DbContextOptions<AirNotebookContext> options) : base(options) { }

        // 定义数据库表，例如 Notes
        public DbSet<Note> Notes { get; set; }
    }

    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}