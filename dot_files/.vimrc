
call plug#begin('~/.vim/plugged')
Plug 'jiangmiao/auto-pairs'
Plug 'tpope/vim-surround'
Plug 'ajh17/VimCompletesMe'
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'
Plug 'w0rp/ale'
Plug 'ajh17/Spacegray.vim'
"Plug 'dracula/vim', { 'as': 'dracula' }
call plug#end()
"vim-javascript settings
let g:javascript_plugin_flow = 1
"vim-jsx settings
let g:jsx_ext_required = 0
"ALE settings
let g:jsx_ext_required = 0
let g:ale_linters = {
\ 'javascript': ['standard'],
\}
let g:ale_fixers = {
\ 'javascript': ['prettier', 'eslint'],
\ '*' : ['remove_trailing_lines', 'trim_whitespace'],
\}
let g:ale_sign_error = '?'
let g:ale_sign_warning = '?'
let g:ale_lint_on_enter = 0
let g:ale_lint_on_text_changed = 'never'
highlight ALEErrorSign ctermbg=NONE ctermfg=red
highlight ALEWarningSign ctermbg=NONE ctermfg=yellow
"let g:ale_linters_explicit = 1
let g:ale_lint_on_save = 1
let g:ale_fix_on_save = 1
let g:ale_javascript_prettier_options = '--no-semi --single-quote --trailing-comma none'
let g:ale_completion_enabled = 1
"Key bindings
nnoremap <leader>af :ALEFix<cr>
"Move between linting errors
nnoremap ]r :ALENextWrap<CR>
nnoremap [r :ALEPreviousWrap<CR>


"""""""""""""""""""""""""""""""""""""""""""""""
" define VIM settings
set tabstop=2 shiftwidth=2 expandtab
set incsearch hlsearch ignorecase smartcase
" set large history list
set history=1000
"show cusrsor position
set ruler
"show incomplete commands
set showcmd
" use a menu when using tab completion options
set wildmenu
" number of lines above scrollline ( z enter )
set scrolloff=5
" enable line numbering
set relativenumber
" keep a ~ backup of the files
set backup
" disable Line wrap
set lbr
set nowrap
" set auto indent
set ai
" smart indent
set si
" assist vim with back ground style when using syntax highlighting
set bg=dark
syntax on

"""""""""""""""""
"Linux settings
"""""""""""""""""
"color dracula
"set guifont=Source\ Code\ Pro\ Semi-Bold\ Italic\ 13
"colorscheme spacegray

" gui settings
set gfn=Consolas:h11:cANSI:qDRAFT
colorscheme industry





