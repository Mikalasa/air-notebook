using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly AirNotebookContext _context;

    public NotesController(AirNotebookContext context)
    {
        _context = context;
    }

    // 获取所有笔记
    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        var notes = await _context.Notes.ToListAsync();
        return Ok(notes);
    }

    // 创建新笔记
    [HttpPost]
    public async Task<IActionResult> CreateNote([FromBody] Note note)
    {
        if (note == null)
        {
            return BadRequest("Note cannot be null");
        }

        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNotes), new { id = note.Id }, note);
    }

    // 更新笔记
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, [FromBody] Note note)
    {
        if (id != note.Id)
        {
            return BadRequest("ID mismatch");
        }

        var existingNote = await _context.Notes.FindAsync(id);
        if (existingNote == null)
        {
            return NotFound();
        }

        existingNote.Title = note.Title;
        existingNote.Content = note.Content;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 删除笔记
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null)
        {
            return NotFound();
        }

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}