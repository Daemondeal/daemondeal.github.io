
from slimgui.integrations.glfw import GlfwRenderer
from slimgui import imgui
from dataclasses import dataclass
from pathlib import Path

from common.logging import setup_logging

import glfw
import logging
import asyncio
import aiohttp
import threading
import OpenGL.GL as gl

log = logging.getLogger("backlog")

path_root = Path(__file__).parent.parent.parent
path_data = (path_root / "data").absolute()
path_font = path_data / "FiraCodeNerdFont-Medium.ttf"

loop = asyncio.new_event_loop()
threading.Thread(target=loop.run_forever, daemon=True).start()

class State:
    request_window_shown: bool = False
    request_ongoing: bool = False

    future: asyncio.Future | None = None

    def request_done(self):
        self.request_ongoing = False
        self.request_window_shown = False
        self.future = None

    def submit_request(self, url):
        async def _request():
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    return await resp.text()
        self.future = asyncio.run_coroutine_threadsafe(_request(), loop)
        self.request_ongoing = True

    def update(self):
        imgui.set_next_window_size((300, 300), imgui.Cond.FIRST_USE_EVER)
        imgui.begin("HI")
        if imgui.button("Show window"):
            self.request_window_shown = True
        imgui.end()

        if self.request_window_shown:
            imgui.set_next_window_size((300, 300), imgui.Cond.FIRST_USE_EVER)
            imgui.begin("Request")

            imgui.begin_disabled(self.request_ongoing)
            if imgui.button("Hide"):

                self.submit_request("https://httpbin.org/delay/5")
                self.request_ongoing = True

            imgui.end_disabled()
            imgui.end()

        if self.future and self.future.done():
            self.request_done()

class ImguiContext:
    window_size: tuple[int, int]
    font_size: int
    stop: bool
    renderer: GlfwRenderer
    font: imgui.Font
    state: State

    def __init__(self, width, height, font_size, state):
        self.window_size = (width, height)
        self.stop = False
        self.font_size = font_size
        self.state = state
        # self.renderer = None

    def _key_callback(self, _window, key, _scan, action, _mods):
        _ = _window, _scan, _mods
        if action == glfw.PRESS and key == glfw.KEY_ESCAPE:
            self.stop = True

    def should_stop(self):
        return glfw.window_should_close(self.window) or self.stop

    def initialize(self):
        glfw.init()

        glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 3)
        glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 3)
        glfw.window_hint(glfw.OPENGL_FORWARD_COMPAT, glfw.TRUE)
        glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)
        glfw.window_hint_string(glfw.WAYLAND_APP_ID, "backlog")
        glfw.window_hint(glfw.VISIBLE, True)

        self.window = glfw.create_window(
            width=self.window_size[0],
            height=self.window_size[1],
            title="Backlog",
            monitor=None,
            share=None,
        )
        glfw.make_context_current(self.window)

        imgui.create_context()
        io = imgui.get_io()
        io.config_flags |= imgui.ConfigFlags.NAV_ENABLE_KEYBOARD
        self.renderer = GlfwRenderer(self.window, prev_key_callback=self._key_callback)

        with open(path_font, "rb") as f:
            font_data = f.read()
            self.font = imgui.get_io().fonts.add_font_from_memory_ttf(font_data, self.font_size)

    def update(self):
        glfw.poll_events()

        # Start new imgui frame.
        gl.glClear(int(gl.GL_COLOR_BUFFER_BIT) | int(gl.GL_DEPTH_BUFFER_BIT))
        self.renderer.new_frame()
        imgui.new_frame()
        imgui.push_font(self.font, 0)  # or push_font(font, font.legacy_size)

        self.state.update()

        imgui.pop_font()
        imgui.render()
        self.renderer.render(imgui.get_draw_data())
        glfw.swap_buffers(self.window)

    def clean(self):
        self.renderer.shutdown()
        imgui.destroy_context(None)


def main():
    setup_logging()

    state = State()
    ctx = ImguiContext(800, 600, font_size=16, state=state)
    ctx.initialize()

    while not ctx.should_stop():
        ctx.update()

    ctx.clean()
