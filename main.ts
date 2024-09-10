import { App, Plugin, PluginSettingTab, Setting, MarkdownRenderer } from 'obsidian';

export default class AlignmentTrackerPlugin extends Plugin {
    async onload() {
        // Registers the block "alignmenttracker"
        this.registerMarkdownCodeBlockProcessor("alignmenttracker", (source, el, ctx) => {
            const values = this.parseSource(source);
            this.renderAlignmentGrid(values, el);
        });
    }

    // Parses the content of the code block
    parseSource(source: string) {
        const values = {
            L: 0, N: 0, C: 0,
            G: 0, N2: 0, E: 0,
        };
        source.split("\n").forEach(line => {
            const [key, value] = line.split(":");
            if (key && value) {
                values[key.trim()] = parseInt(value.trim());
            }
        });
        return values;
    }

    // Renderizes the grid using HTML
    renderAlignmentGrid(values: any, el: HTMLElement) {
        const grid = document.createElement("div");
        grid.className = "alignment-grid";

        const alignments = [
            { name: "LG", value: values.L },
            { name: "NG", value: values.N },
            { name: "CG", value: values.C },
            { name: "LN", value: values.G },
            { name: "N", value: values.N2 },
            { name: "CN", value: values.E },
            { name: "LE", value: values.L },
            { name: "NE", value: values.N2 },
            { name: "CE", value: values.E }
        ];

        alignments.forEach(align => {
            const cell = document.createElement("div");
            cell.className = "alignment-cell";
            cell.setAttribute("data-value", align.value.toString());
            cell.textContent = align.name;
            grid.appendChild(cell);
        });

        el.appendChild(grid);
    }
}
